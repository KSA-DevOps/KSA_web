---

config:
  layout: dagre
---
flowchart TB
 subgraph Agent_Command_Loop["자연어 명령 -&gt; 계획 -&gt; 관측 -&gt; 행동 loop<br>unitree-go2-agentic 기준"]
        U1["사용자가 CLI에서 `dimos agent-send 를 실행합니다.<br>`_get_adapter()`로 현재 실행 중인 MCP endpoint를 찾고<br>`agent_send` tool 호출을 시작합니다.<br><br>dimos/robot/cli/dimos.py:307-311<br>dimos/robot/cli/dimos.py:417-430"]
        U2["CLI의 McpAdapter가 로컬 MCP server로<br>`tools/call(name=agent_send, arguments={message: ...})`<br>JSON-RPC 요청을 보냅니다.<br><br>dimos/agents/mcp/mcp_adapter.py:55-113"]
        U3["MCP server의 `agent_send` skill이<br>`/human_input` transport를 열고<br>사용자 메시지를 publish 합니다.<br><br>dimos/agents/mcp/mcp_server.py:253-266"]
        Agt1["agentic blueprint가 기본 로봇 stack 위에<br>Agent + skill container + web_input을 추가합니다.<br><br>dimos/robot/unitree/go2/blueprints/agentic/unitree_go2_agentic.py:21-25<br>dimos/robot/unitree/go2/blueprints/agentic/_common_agentic.py:24-30"]
        Agt2@{ label: "자연어 입력 전달 계층<br>`/human_input`은 Agent로 들어가는 공통 텍스트 입력 채널입니다.<br>CLI의 `agent-send`와 web_input의 웹 UI/STT 결과가 모두 여기로 합류합니다.<br><br>dimos/agents/mcp/mcp_server.py:253-266<br>dimos/agents/web_human_input.py:40-76" }
        Agt3@{ label: "Agent가 `human_input`을 구독해<br>입력을 `HumanMessage`로 message queue에 넣습니다.<br><br>dimos/agents/agent.py:74-81" }
        Agt4@{ label: "시스템 시작 시 Agent가 사용할 tool 목록을 수집하고<br>LangGraph agent(`create_agent`)를 초기화합니다.<br><br>dimos/agents/agent.py:90-115" }
        Agt5["Agent 전용 thread가 queue를 계속 polling 하다가<br>새 message를 꺼내 처리합니다.<br><br>dimos/agents/agent.py:120-130"]
        Agt6@{ label: "Agent가 history + system prompt + tool set을 바탕으로<br>다음 행동을 내부적으로 결정합니다.<br>여기서 '계획'은 별도 planner 객체가 아니라<br>`state_graph.stream(...)` 안의 reasoning/tool-use 과정으로 수행됩니다.<br><br>dimos/agents/agent.py:132-148<br>dimos/agents/system_prompt.py:15-53" }
        Agt7@{ label: "관측 컨텍스트를 수집합니다.<br>Navigation skill은 최신 image/odom을 계속 캐시하고<br>필요하면 `observe()`로 현재 프레임을 직접 tool로 가져올 수 있습니다.<br><br>dimos/agents/skills/navigation.py:67-82<br>dimos/robot/unitree/go2/connection.py:326-333" }
        Agt8@{ label: "선택된 tool을 실제 skill/RPC 호출로 실행합니다.<br>예: `navigate_with_text`, `relative_move`, `speak`, `observe`<br>tool 실행 결과는 문자열 또는 artefact로 반환됩니다.<br><br>dimos/agents/agent.py:155-187<br>dimos/agents/skills/navigation.py:119-188<br>dimos/robot/unitree/unitree_skill_container.py:187-237" }
        Agt9["관측 결과나 tool artefact가 있으면<br>Agent history에 다시 append되어 다음 reasoning의 입력이 됩니다.<br>즉 observation -&gt; re-plan -&gt; next action이 반복됩니다.<br><br>dimos/agents/agent.py:176-201"]
  end
 subgraph Runtime_Dataflow["런타임 데이터 흐름"]
        R1["Go2 연결 module이 센서 스트림을 열고<br>lidar / odom / video를 WebRTC에서 받아 DimOS stream으로 publish합니다<br><br>dimos/robot/unitree/go2/connection.py:225-249"]
        R2@{ label: "센서 브리지 계층<br>Unitree WebRTC topic을 Observable로 감싸고 lidar/odom/video로 변환합니다.<br><br><span style=\"color:\">Lider: raw_lidar_stream -&gt; lidar_stream</span><span style=\"color:\"><br></span><span style=\"color:\">Odom: raw_odom_stream -&gt; odom_stream</span><span style=\"color:\"><br></span><span style=\"color:\">Video: raw_video_stream -&gt; video_stream</span><span style=\"color:\"><br> <br></span>dimos/robot/unitree/connection.py:206-255" }
        R3["voxel 맵을 생성합니다.<br>lidar -&gt; voxel global_map<br><br>dimos/mapping/voxels.py:82-121"]
        R4["네비게이션 costmap을 생성합니다.<br>global_map -&gt; global_costmap<br><br>dimos/mapping/costmapper.py:53-82"]
        Agent_Command_Loop
        R6["전역 계획<br>goal + odom + global_costmap으로 경로를 계산하고 local planner를 시작합니다.<br><br>dimos/navigation/replanning_a_star/module.py:52-83<br>dimos/navigation/replanning_a_star/global_planner.py:121-127<br>dimos/navigation/replanning_a_star/global_planner.py:256-299"]
        R7@{ label: "지역 제어 loop<br>경로와 현재 odom을 바탕으로 주기적으로 `cmd_vel`을 생성합니다.<br><br>dimos/navigation/replanning_a_star/local_planner.py:104-115<br>dimos/navigation/replanning_a_star/local_planner.py:158-223" }
        R8@{ label: "stream 전달<br>planner가 발행한 `cmd_vel`이 GO2Connection 입력으로 전달됩니다.<br><br>dimos/core/stream.py:172-183<br>dimos/core/stream.py:230-240" }
        R9@{ label: "로봇 명령 브리지<br>GO2Connection이 `cmd_vel`을 받아 `move()`를 호출합니다.<br><br>dimos/robot/unitree/go2/connection.py:235-239<br>dimos/robot/unitree/go2/connection.py:301-303" }
        R10@{ label: "실제 WebRTC 제어 패킷 송신<br>Twist를 Unitree joystick 좌표로 변환해 `WIRELESS_CONTROLLER`로 publish합니다.<br><br>dimos/robot/unitree/connection.py:150-204<br>dimos/robot/unitree/connection.py:166-170" }
  end
    A@{ label: "1. CLI가 실행 요청을 받은 뒤<br>`dimos run unitree-go2-agentic`와 CLI 파라미터를 수집하여 config에 override 합니다.<br><br>dimos/robot/cli/dimos.py:112-166" } --> B@{ label: "2. CLI 파라미터로 전달 받은 인자를 blueprint 객체로 해석한 뒤<br>blueprint에 해당하는 객체를 찾아서 import 합니다.<br><br>i.e. `unitree-go2-agentic` -&gt; `unitree_go2_agentic` blueprint 객체 import<br><br>dimos/robot/all_blueprints.py:78<br>dimos/robot/get_all_blueprints.py:37-42" }
    B --> C@{ label: "3. 최상단 blueprint에 정의된 모듈을 바탕으로 실행할 구성을 확정합니다.<br><br>i.e. `unitree_go2_agentic`은 `unitree_go2_spatial + agent() + _common_agentic`을 묶은 blueprint입니다.<br><br>dimos/robot/unitree/go2/blueprints/agentic/unitree_go2_agentic.py:21-25" }
    C --> D@{ label: "4. 최종 blueprint를 조립합니다.<br><br>CLI에서 요청한 blueprint/module 목록을 `autoconnect()`로 하나의 실행 사양으로 합칩니다.<br><br>dimos/robot/cli/dimos.py:160<br>dimos/core/blueprints.py:502-526" }
    D --> E["5. build()안에서 모듈을 실행하기 위한 환경을 구축한 뒤 배포합니다.<br><br>dimos/core/blueprints.py:453-499"]
    E --> F@{ label: "6. 각 모듈에 정의된 Type Hint에 따라 stream 배선이 자동 연결됩니다.<br><br>이름/타입이 같은 In/Out이 transport로 연결됩니다.<br><br>예: `lidar`, `odom`, `global_costmap`, `goal_request`, `cmd_vel`, `human_input`<br><br>dimos/core/blueprints.py:286-313" }
    F --> G["7. worker 프로세스에 module 인스턴스를 생성하여<br>각 module이 별도 worker에 배치되고 RPC proxy로 접근 가능하도록 합니다.<br><br>dimos/core/module_coordinator.py:92-101<br>dimos/core/module_coordinator.py:126-135<br>dimos/core/worker.py:187-197<br>dimos/core/worker.py:334-360"]
    G --> H@{ label: "8. 모든 module의 `start()`가 호출되고<br>이 시점부터 subscribe, thread, sensor bridge, planner loop 프로세스가 시작됩니다.<br><br>dimos/core/module_coordinator.py:137-149" }
    H --> I["9. 메인 프로세스는 생명주기만 유지하고<br>실제 데이터 처리와 제어는 worker/module 쪽에서 계속 동작합니다.<br><br>dimos/core/module_coordinator.py:154-161"] & R1 & Agt1
    U1 --> U2
    U2 --> U3
    U3 --> Agt2
    Agt1 --> Agt2
    Agt1 --> Agt4
    Agt2 --> Agt3
    Agt3 --> Agt5
    Agt4 --> Agt5
    Agt5 --> Agt6
    Agt6 --> Agt7
    Agt7 --> Agt8
    Agt8 --> Agt9 & R6
    Agt9 --> Agt6
    R1 --> R2 & R6 & Agt7
    R2 --> R3
    R3 --> R4
    R4 --> R6 & Agt7
    R6 --> R7
    R7 --> R8
    R8 --> R9
    R9 --> R10

    U2@{ shape: rect}
    U3@{ shape: rect}
    Agt2@{ shape: rect}
    Agt3@{ shape: rect}
    Agt4@{ shape: rect}
    Agt6@{ shape: rect}
    Agt7@{ shape: rect}
    Agt8@{ shape: rect}
    R2@{ shape: rect}
    R7@{ shape: rect}
    R8@{ shape: rect}
    R9@{ shape: rect}
    R10@{ shape: rect}
    A@{ shape: rect}
    B@{ shape: rect}
    C@{ shape: rect}
    D@{ shape: rect}
    F@{ shape: rect}
    H@{ shape: rect}
